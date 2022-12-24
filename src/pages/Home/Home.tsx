import Title from "../../components/Title";
import OffersTable from "./OffersTable";

function Home() {
    return (
        <>
            <Title
                main="Our Offers"
                sub="our packages for this monts"
            />

            <OffersTable />
        </>
    );
}

export default Home;