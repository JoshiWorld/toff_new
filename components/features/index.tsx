import React from "react";
import { GradientContainer } from "../gradient-container";
import { Container } from "../container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";
import { FeatureIconContainer } from "./feature-icon-container";
import { FaBolt, FaChartLine } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle,
} from "./card";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonThree } from "./skeletons/third";
import { SkeletonFour } from "./skeletons/fourth";
import { SkeletonFive } from "./skeletons/fifth";

export const Features = () => {
  return (
    <GradientContainer className="md:my-20">
      <Container className="py-20 max-w-5xl mx-auto relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <FaBolt className="h-6 w-6 text-purple-500" id="musik" />
        </FeatureIconContainer>
        <Heading className="pt-4">Überzeug dich selbst</Heading>
        <Subheading>
          Die neusten Songs von TOFF
        </Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-10">
          {/* <Card className="lg:col-span-2">
            <CardTitle>Roter Himmel</CardTitle>
            <CardDescription>
              With our AI-powered platform, you can post to multiple platforms
              at once, saving you time and effort.
            </CardDescription>
            <CardSkeletonContainer>
              <SkeletonOne />
            </CardSkeletonContainer>
          </Card> */}
          <Card>
            <iframe
              src="https://open.spotify.com/embed/album/7pJkj3tH33ujN1Mptro4Vz?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Card>
          <Card>
            <iframe
              src="https://open.spotify.com/embed/track/4joXMyRKlxq7nY6b5NipY5?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Card>
          <Card>
            <iframe
              src="https://open.spotify.com/embed/album/6wwBIQFgVCkc1RFn4uCxJk?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Card>
          <Card>
            <iframe
              src="https://open.spotify.com/embed/track/5jjloWUkP1pMiKmjAI9svN?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Card>
          <Card>
            <iframe
              src="https://open.spotify.com/embed/track/19tOnjrDkzutqhi6vy2wZF?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Card>
          <Card>
            <iframe
              src="https://open.spotify.com/embed/track/7dzL0c9JxJfaAR7Oz2Uo1R?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Card>
        </div>
      </Container>
    </GradientContainer>
  );
};
