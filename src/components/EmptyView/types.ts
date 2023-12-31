export interface OwnProps {
  title: string;
  description?: any;
  isRefresh: boolean | any;
  uri?: string | any;
  onPress?: () => void;
}

export type Props = OwnProps;
