export interface Database {
  public: {
    Tables: {
      site_content: {
        Row: {
          id: string;
          key: string;
          locale: string;
          section: string;
          value: unknown;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          locale: string;
          section: string;
          value: unknown;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          locale?: string;
          section?: string;
          value?: unknown;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          category: string;
          location: string;
          year: string;
          description: string;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          category: string;
          location: string;
          year: string;
          description: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          location?: string;
          year?: string;
          description?: string;
          order_index?: number;
          updated_at?: string;
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          alt_text: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          alt_text?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          image_url?: string;
          alt_text?: string;
          sort_order?: number;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          location: string;
          text: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          text: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          text?: string;
          sort_order?: number;
        };
      };
      faq_items: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          sort_order?: number;
        };
      };
      media: {
        Row: {
          id: string;
          url: string;
          alt_text: string;
          file_name: string;
          file_size: number;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          alt_text?: string;
          file_name: string;
          file_size?: number;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          alt_text?: string;
          file_name?: string;
          file_size?: number;
        };
      };
    };
  };
}
