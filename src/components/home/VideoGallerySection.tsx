export function VideoGallerySection() {
  const videos = [
    {
      id: "D2z66wSByv8",
      title: "Sports Edge Oil Jr",
    },
    {
      id: "Q7THmapoTeQ", 
      title: "AllerGenie",
    },
    {
      id: "vsNsT97oEpg",
      title: "Vario Kit",
    },
  ];

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Brand Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the authentic journey of The Poona Ayurveda through our brand stories
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {videos.map((video) => (
              <div key={video.id} className="group">
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}