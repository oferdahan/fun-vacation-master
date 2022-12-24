import { createContext, useEffect, useState } from "react";
import Panel from "../../components/Panel";
import Title from "../../components/Title";
import { deleteRequest, getRequest } from "../../services/apiService";
import AddForm from "./AddForm";
import TableRow from "./TableRows";

export interface IVacation {
    _id: number;
    date: string;
    location: string;
    price: number;
}

interface Context {
    vacations?: Array<IVacation>;
    delVacation?: Function;
}

export const VacationContext = createContext<Context>({});

function Vacations() {
    const [vacations, setVacations] = useState<Array<IVacation>>([]);

    function getVacations() {
        const res = getRequest('vacations');
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                setVacations(json);
            })
    }

    useEffect(getVacations, []);

    function addVacation(newVacation: IVacation) {
        const updated = [...vacations];
        updated.push(newVacation);
        setVacations(updated);
    }

    function delVacation(vacation: IVacation) {
        const res = deleteRequest(
            `vacations/${vacation._id}`
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                const updated = [...vacations].filter(
                    vacationItem => vacationItem._id !== vacation._id
                );

                setVacations(updated);
            })
    }

    return (
        <VacationContext.Provider value={{ vacations, delVacation }}>
            <Title
                main="Vacations"
                sub="manage vacation packages"
            />

            {
                vacations.length === 0 &&
                <div
                    className="alert alert-info m-5"
                >
                    No vacations
                </div>
            }

            <Panel>

                <AddForm addVacation={addVacation} />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="w-25">Date</th>
                            <th className="w-25">Location</th>
                            <th className="w-50">Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <TableRow />
                        }
                    </tbody>
                </table>
            </Panel>
        </VacationContext.Provider>
    );
}

export default Vacations;
