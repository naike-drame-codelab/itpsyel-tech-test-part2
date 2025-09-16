import { NextResponse } from 'next/server';
import { generateReports } from '../../../lib/bulletinService';

export async function GET() {
    try {
        const { bulletins } = await generateReports();
        return NextResponse.json(bulletins);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
