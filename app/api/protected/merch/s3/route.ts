import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const frontImage = formData.get("frontImage");
    const backImage = formData.get("backImage");

    if (!frontImage || !backImage) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    // @ts-expect-error || file.arrayBuffer() is always there, when a file is delivered
    const bufferFront = Buffer.from(await frontImage.arrayBuffer());
    // @ts-expect-error || file.arrayBuffer() is always there, when a file is delivered
    const bufferBack = Buffer.from(await backImage.arrayBuffer());
    // @ts-expect-error || its always true
    const frontName = `merch/${Date.now()}-${frontImage.name}`;
    // @ts-expect-error || its always true
    const backName = `merch/${Date.now()}-${backImage.name}`;

    const uploadParamsFront = {
      Bucket: BUCKET_NAME,
      Key: `${frontName}`,
      Body: bufferFront,
      ContentType: "image/jpg",
    };
    const uploadParamsBack = {
      Bucket: BUCKET_NAME,
      Key: `${backName}`,
      Body: bufferBack,
      ContentType: "image/jpg",
    };

    const commandFront = new PutObjectCommand(uploadParamsFront);
    await s3.send(commandFront);
    const commandBack = new PutObjectCommand(uploadParamsBack);
    await s3.send(commandBack);

    const linkFront = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${frontName}`;
    const linkBack = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${backName}`;

    return NextResponse.json({ success: true, linkFront, linkBack }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}

function extractKeyFromUrl(url: string) {
  const urlPattern = new RegExp(
    `https://${BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/(.*)`
  );
  const match = url.match(urlPattern);

  return match ? match[1] : null;
}
