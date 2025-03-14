import ArtworkCard from "@/components/ArtworkCard";

// Fetch auctions from the API
async function fetchArtworks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/artworks`);
  return res.json();
}

export default async function ArtworkPage() {
  const artworks = await fetchArtworks();

  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-end mb-6">ArtWorks</h1>

      {artworks.length > 0 && (
        <section className="mb-12 max_width ">
          <h2 className="text-2xl font-semibold mb-4">Artworks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map(artwork => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
