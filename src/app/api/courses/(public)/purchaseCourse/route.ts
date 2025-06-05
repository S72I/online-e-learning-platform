import { addPurchaseCourse } from '@/server/controllers/course.controller';
import { IPurchasedCourse } from '@/server/interfaces';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, courseId } = body;

        if (!userId || !courseId) {
            return NextResponse.json({ error: "userId and courseId are required" }, { status: 400 });
        }

        const purchaseCourse: IPurchasedCourse = { userId, courseId };
        const result = await addPurchaseCourse(request, purchaseCourse);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 }
        );
    }
}
