import { NavBar } from '../components/navBar';
import { DashboardContainer } from '../components/dashBoardContainer';
const Dashboard: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="min-h-screen flex justify-center bg-gradient-to-b from-white to-[#3074f4]">
                <DashboardContainer></DashboardContainer>
            </div>
        </>
    );
};

export default Dashboard;
