'use client';
import { useParams } from "next/navigation";
import { useState } from "react";

export default function LastNewsDetailPage() {
	const [params, setParams] = useState(useParams().slug as string);

	return <div>{params}</div>;
}
