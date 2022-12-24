import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../services/apiService";
import { formatDate } from "../utils/utils";
import { IVacation } from "./Vacations/Vacations";

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [price, setPrice] = useState<number>(1);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const res = getRequest(`vacations/${id}`);
        if (!res) return;

        res.then(res => res.json())
            .then(json => {
                if (json.ok === false) {
                    setError('error get the data');
                    return;
                }

                setDate(json.date);
                setLocation(json.location);
                setPrice(json.price);
            })
    }, [id]);

    function handleClick() {
        const schema = Joi.object().keys({
            date: Joi.string().required().min(3),
            location: Joi.string().required().min(3),
            price: Joi.number().required().min(1)
        });

        const { error, value } = schema.validate({
            date,
            location,
            price
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        editVacation(value);
    }

    function editVacation(vacation: IVacation) {
        const res = patchRequest(
            `vacations/${id}`,
            vacation
        );
        if (!res) return;

        res.then(res => res.json())
            .then(json => {
                if (json.error) {
                    setError(json.error);
                    return;
                }

                navigate('/vacations');
            })
    }

    return (
        <>
            <div className="bg-light m-4">
                <div className="mb-3">
                    <label
                        htmlFor="date"
                        className="form-label">
                        Date
                    </label>
                    <div>
                        {formatDate(date)}
                    </div>
                </div>

                <div className="mb-3">
                    <label
                        className="form-label">
                        Location
                    </label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control me-3"
                        type="text"
                        placeholder="Location"
                    />
                </div>

                <div className="mb-3">
                    <label
                        className="form-label">
                        Price
                    </label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(+e.target.value)}
                        className="form-control me-3"
                        type="number"
                        placeholder="Price"
                    />
                </div>

                <button
                    onClick={handleClick}
                    className="btn btn-info me-3"
                >
                    Update
                </button>

                <Link
                    to="/vacations"
                    className="btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>

            {
                error &&
                <div className="text-danger">
                    {error}
                </div>
            }
        </>
    );
}

export default Edit;
