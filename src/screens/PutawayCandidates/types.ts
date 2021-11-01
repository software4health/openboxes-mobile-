import {getCandidates} from "../../redux/actions/putaways";

export interface OwnProps {
    navigation: any
}

export interface StateProps {
    candidates: any
    SelectedLocation: any
}

export interface DispatchProps {
    showScreenLoading: (message?: string) => void;
    hideScreenLoading: () => void;
    getCandidates: (locationId: string, callback?: () => void) => void;
}

export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
    selectedItem: any
}