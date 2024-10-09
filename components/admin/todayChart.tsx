"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
//   ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RouteTracking } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const description = "TOFF PageViewStats";

type ChartConfigValue = {
  label: string;
  color: string;
};

type ChartConfig = {
  [key: string]: ChartConfigValue;
};

export function RouteTrackingChart({ data }: { data: RouteTracking[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("count");
  const routes = data.reduce<string[]>((acc, entry) => {
    const route = entry.route;
    if (!acc.includes(route)) {
      acc.push(route);
    }
    return acc;
  }, []);
  const [selectedRoute, setSelectedRoute] =
    React.useState<string>("/startseite");

  const chartConfig: ChartConfig = {
    views: {
      label: "Aufrufe",
      color: "hsl(var(--chart-1))",
    },
    ...routes.reduce((acc, route) => {
      acc[route] = {
        label:
          route.split("/")[1].charAt(0).toUpperCase() +
          route.split("/")[1].slice(1).toLowerCase(),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Seitenaufrufe</CardTitle>
          <CardDescription>Der letzten 3 Monate</CardDescription>
        </div>
        <div className="flex p-6">
          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seite auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Seiten</SelectLabel>
                {routes.map((route) => (
                  <SelectItem value={route} key={route}>
                    {route.split("/")[1].charAt(0).toUpperCase() +
                      route.split("/")[1].slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data.filter((track) => track.route === selectedRoute)}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("de-DE", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("de-DE", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={chartConfig[activeChart]?.color || "#000"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
