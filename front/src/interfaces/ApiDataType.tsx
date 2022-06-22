export interface PostListType {
  "id": number;
  "nickname":  string;
  "email":  string;
  "title": string;
  "content": string;
  "imageUrl": string;
  "likeByMe": boolean;
  "likeCount": number;
  "view_count": number;
  "createdAt": Date;
  "modifiedAt": Date;
  "profileImageUrl": string;
  "template": number;
}
export interface PostResType{
  "end":boolean;
  "posts":PostListType[]
}
