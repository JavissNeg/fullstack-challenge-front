export interface IStackItem {
  question_id: number;
  title: string;
  link: string;
  score: number;
  answer_count: number;
  is_answered: boolean;
  tags: string[];
  view_count: number;
  creation_date: number;
  last_activity_date: number;
  last_edit_date?: number;

  owner: {
    user_id?: number;
    display_name: string;
    reputation: number;
    profile_image?: string;
    user_type?: string;
    link?: string;
  };

  content_license?: string;
}