// Client-safe WordPress API functions
export const getSiteSettings = async () => {
  try {
    if (typeof window === 'undefined') return null;
    
    const baseUrl = process.env.NEXT_PUBLIC_WC_URL!.replace('/wp-json/wc/v3', '');
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/settings`);
    if (!response.ok) throw new Error('Failed to fetch settings');
    return await response.json();
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
};

export const getMediaById = async (id: number) => {
  try {
    if (typeof window === 'undefined') return null;
    
    const baseUrl = process.env.NEXT_PUBLIC_WC_URL!.replace('/wp-json/wc/v3', '');
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/media/${id}`);
    if (!response.ok) throw new Error('Failed to fetch media');
    return await response.json();
  } catch (error) {
    console.error("Error fetching media:", error);
    return null;
  }
};