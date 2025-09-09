import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen pt-24 bg-background">
        <div className="container mx-auto px-4 py-16">
          <Link
            href="/cost-optimisation"
            className="text-foreground leading-tight"
          >
            Cost Optimisation
          </Link>
        </div>
      </div>
    </>
  );
}
