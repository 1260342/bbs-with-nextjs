import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { bbsId: string } }
) {
  const bbsId = Number(params.bbsId);

  if (isNaN(bbsId)) {
    // bbsId が数値でない場合のエラーハンドリング
    return NextResponse.json({ error: "Invalid bbsId" }, { status: 400 });
  }

  try {
    // Prisma クエリでデータを取得
    const bbsDetailData = await prisma.post.findUnique({
      where: {
        id: bbsId,
      },
    });

    // データが見つからない場合の処理
    if (!bbsDetailData) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 正常なレスポンス
    return NextResponse.json(bbsDetailData);
  } catch (error) {
    // エラー時の処理
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
