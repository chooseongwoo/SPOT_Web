interface HistoryType {
  id: string;
  user_id: string;
  content: string;
  lat: number;
  lng: number;
  is_time_capsule: boolean;
  ar_required: boolean;
  open_at: string | null;
  created_at: string;
  read: boolean;
  is_anonymous: boolean;
  nickname: string;
  profile_image_url: string;
}

export default HistoryType;
