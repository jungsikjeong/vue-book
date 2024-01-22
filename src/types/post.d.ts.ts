export interface Post {
  content: {
    insert: string;
  };
  createdAt: string;
  displayName: string;
  id: string;
  imageUrl: { src: string }[];
  tags: string[];
  title: string;
  uid: string;
}
