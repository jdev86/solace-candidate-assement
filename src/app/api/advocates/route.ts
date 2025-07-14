import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { advocateData } from "../../../db/seed/advocates";

interface Advocate {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string | number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  try {
    // Build filter (city and specialties only)
    let whereClause = undefined;
    if (search) {
      const pattern = `%${search}%`;
      whereClause = sql`city ILIKE ${pattern} OR payload::text ILIKE ${pattern}`;
    }

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(advocates)
      .where(whereClause ?? sql`TRUE`);

    // Get paginated data
    const rows = await db
      .select()
      .from(advocates)
      .where(whereClause ?? sql`TRUE`)
      .limit(limit)
      .offset(offset);

    const data: Advocate[] = rows.map((row) => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      city: row.city,
      degree: row.degree,
      specialties: Array.isArray(row.specialties) ? row.specialties : [],
      yearsOfExperience: row.yearsOfExperience,
      phoneNumber: row.phoneNumber,
    }));

    return NextResponse.json({ data, total: Number(count), page, limit });
  } catch (err) {
    console.error("API error:", err);
    // Fallback to mock data (city and specialties only)
    const filtered = search
      ? advocateData.filter((advocate) =>
          [advocate.city, ...(advocate.specialties || [])]
            .some((field) =>
              typeof field === "string" && field.toLowerCase().includes(search.toLowerCase())
            )
        )
      : advocateData;
    const total = filtered.length;
    const data = filtered.slice(offset, offset + limit);
    return NextResponse.json({ data, total, page, limit });
  }
}
