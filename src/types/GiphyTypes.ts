export interface GiphyImages {
    original: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_height: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
  }
  
  export interface GiphyUser {
    username?: string;
    display_name?: string;
    avatar_url?: string;
  }
  
  export interface GiphyGif {
    id: string;
    url: string;
    slug: string;
    title: string;
    username: string;
    rating: string;
    import_datetime: string;
    trending_datetime: string;
    images: GiphyImages;
    user?: GiphyUser;
  }
  
  export interface GiphySearchResponse {
    data: GiphyGif[];
    pagination: {
      total_count: number;
      count: number;
      offset: number;
    };
    meta: {
      status: number;
      msg: string;
      response_id: string;
    };
  }
  