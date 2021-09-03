
import React from 'react';
import MainHeader from './MainHeader';
import { Route, Switch } from 'react-router';
import DashBoardHome from '../dashboard';
import CoverageCheck from '../order-management';
import OrderSearch from '../order-management/order-search';
import AppointmentBooking from '../order-management/appointment-booking';
import BTUInstallation from '../order-management/btu-installation';
import TransferRequestSearch from '../order-transfer/order-transfer-search';
import CreateTransfer from '../order-transfer/order-transfer-create';
import TransferDetail from '../order-transfer/order-transfer-details';
import DemandListSearch from '../demand-list/demand-list-search';
import CreateDemandList from '../demand-list/demand-list-create';
import DemandListOrderDetail from '../demand-list/demand-list-order-detail';
import SupportSearch from '../support/support-search';
import SupportDetail from '../support/support-details';
import SupportCreate from '../support/support-create';
import SupportAppointment from '../support/support-appointment';
import UserManagement from '../admin/user-management';
import ReviewOrder from '../order-management/review-order';

const routes = ({ ...props }) => {
	return (
		<>
			<MainHeader />
			<Switch>
				<Route path={`${props.match.url}/home`} component={DashBoardHome} />
				<Route path={`${props.match.url}/coverage-check`} component={CoverageCheck} />
				<Route exact path={`${props.match.url}/order`} component={OrderSearch} />
				<Route path={`${props.match.url}/order/btu-installation`} component={BTUInstallation} />
				<Route path={`${props.match.url}/order/appointment`} component={AppointmentBooking} />
				<Route path={`${props.match.url}/order/review-order`} component={ReviewOrder} />
				<Route exact path={`${props.match.url}/transfer-request`} component={TransferRequestSearch} />
				<Route path={`${props.match.url}/transfer-request/create`} component={CreateTransfer} />
				<Route path={`${props.match.url}/transfer-request/:paramReferenceId`} component={TransferDetail} />
				<Route exact path={`${props.match.url}/demand-list/search`} component={DemandListSearch} />
				<Route path={`${props.match.url}/demand-list/search/:paramReferenceId`} component={DemandListOrderDetail} />
				<Route path={`${props.match.url}/demand-list/create`} component={CreateDemandList} />
				<Route exact path={`${props.match.url}/support`} component={SupportSearch} />
				<Route exact path={`${props.match.url}/support/create`} component={SupportCreate} />
				<Route exact path={`${props.match.url}/support/appointment`} component={SupportAppointment} />
				<Route path={`${props.match.url}/support/:paramReferenceId`} component={SupportDetail} />
				<Route path={`${props.match.url}/admin`} component={UserManagement} />
			</Switch>
		</>
	)
}

export default routes;