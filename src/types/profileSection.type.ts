type ProfileSectionItem =
  | {
      label: string;
      showChevron?: boolean;
      className?: string;
    }
  | {
      custom: React.ReactNode;
    };

export default interface ProfileSection {
  title: string | null;
  items: ProfileSectionItem[];
}
