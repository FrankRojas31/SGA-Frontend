export interface ICommentSend {
  user_id: number;
  comment: string;
}

export interface IComments{
  id: number;
  user_id: number;
  comment: string
}

export interface ICommentsArray {
  status: string
  results: IComments[]
  vulnerability: string;
}
