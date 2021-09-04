import React from 'react';
import { Dimmer,Loader} from 'semantic-ui-react';

export const PleaseWait = ({
    ...props
}) => {

    return (
        <Dimmer active={props.active} page style={{ paddingTop: '300px' }}>
        {
            <Loader indeterminate size={'huge'}> Please wait, we are fetching data for you...</Loader>
        }
        </Dimmer>
    )
}

