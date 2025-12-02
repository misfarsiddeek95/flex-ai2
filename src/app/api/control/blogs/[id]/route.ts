import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { PERMISSIONS } from "@/lib/permissions";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.BLOGS.VIEW);
        const { id } = await params;
        const blog = await prisma.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
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
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.BLOGS.EDIT);
        const { id } = await params;
        const body = await request.json();

        // If this blog is set to show in home, unset others
        if (body.showInHome) {
            await prisma.blog.updateMany({
                where: {
                    showInHome: true,
                    id: { not: id } // Don't need to unset self, but good practice to exclude
                },
                data: { showInHome: false },
            });
        }

        const blog = await prisma.blog.update({
            where: { id },
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
        return NextResponse.json(
            { error: "Failed to update blog" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth(PERMISSIONS.BLOGS.DELETE);
        const { id } = await params;
        await prisma.blog.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Blog deleted" });
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
        return NextResponse.json(
            { error: "Failed to delete blog" },
            { status: 500 }
        );
    }
}
