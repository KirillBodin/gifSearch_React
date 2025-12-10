export interface GiphyImageFormat {
    url: string;
    width: string;
    height: string;
    size?: string;
  }
  
  export interface GiphyImages {
    original: GiphyImageFormat;
    preview_gif?: GiphyImageFormat;
    fixed_width?: GiphyImageFormat;
  }
  
  export interface GiphyGif {
    id: string;
    title: string;
    url: string;
    images: GiphyImages;
  
    username?: string;
    import_datetime?: string;
    rating?: string;
  }
  
  export interface GiphyPagination {
    total_count: number;
    count: number;
    offset: number;
  }
  
  export interface SearchGifsResponse {
    data: GiphyGif[];
    pagination: GiphyPagination;
  }
  