"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LinkTracking } from "@prisma/client";

export const description = "A donut chart with text";

const chartConfig = {
  visitors: {
    label: "Aufrufe",
  },
  Desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  Mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  Unknown: {
    label: "Unknown",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const getRandomColor = () => {
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  return randomColor;
};

export function DeviceChart({ trackings }: { trackings: LinkTracking[] }) {
  const totalVisitors = React.useMemo(() => {
    return trackings.reduce((acc, curr) => acc + curr.count, 0);
  }, [trackings]);

  const trackingsUniqueLinktype = React.useMemo(() => {
    const initialData = trackings.reduce((acc, curr) => {
      const { linkType, count } = curr;

      const existingEntry = acc.find((entry) => entry.linkType === linkType);

      if (existingEntry) {
        existingEntry.count += count;
      } else {
        acc.push({ linkType, count });
      }

      return acc;
    }, [] as { linkType: string; count: number }[]);

    return initialData.map((entry) => {
      return {
        ...entry,
        fill: getRandomColor(),
      };
    });
  }, [trackings]);

  return (
    <div className="flex flex-row justify-center">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Geräte</CardTitle>
          <CardDescription>letzte 3 Monate</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={trackingsUniqueLinktype}
                dataKey="count"
                nameKey="linkType"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Aufrufe
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
      </Card>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Länder</CardTitle>
          <CardDescription>letzte 3 Monate</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={trackingsUniqueLinktype}
                dataKey="count"
                nameKey="linkType"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Aufrufe
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
      </Card>
    </div>
  );
}
