import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    // @ts-expect-error || file.arrayBuffer() is always there, when a file is delivered
    const buffer = Buffer.from(await file.arrayBuffer());
    // @ts-expect-error || its always true
    const fileName = `live/${Date.now()}-${file.name}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: `${fileName}`,
      Body: buffer,
      ContentType: "image/jpg",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const link = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ success: true, link }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
