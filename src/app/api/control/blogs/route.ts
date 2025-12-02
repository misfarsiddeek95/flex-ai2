import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET() {
    try {
        await requireAuth(PERMISSIONS.BLOGS.VIEW);

        const blogs = await prisma.blog.findMany({
            orderBy: { publishDate: "desc" },
        });
        return NextResponse.json(blogs);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "Unauthorized") {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            if (error.message === "Forbidden") {
                return NextResponse.json(
                    { error: "Forbidden: Insufficient permissions" },
                    { status: 403 }
                );
            }
        }
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await requireAuth(PERMISSIONS.BLOGS.CREATE);

        const body = await request.json();

        // If this blog is set to show in home, unset others
        if (body.showInHome) {
            await prisma.blog.updateMany({
                where: { showInHome: true },
                data: { showInHome: false },
            });
        }

        const blog = await prisma.blog.create({
            data: body,
        });
        return NextResponse.json(blog);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "Unauthorized") {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            if (error.message === "Forbidden") {
                return NextResponse.json(
                    { error: "Forbidden: Insufficient permissions" },
                    { status: 403 }
                );
            }
        }
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
