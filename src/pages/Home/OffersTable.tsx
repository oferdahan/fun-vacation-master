import { useState } from "react";
import { Offer, data } from "../../data/offers";
import { formatPrice } from "../../utils/utils";

enum SortDirection {
    asc = 'asc', // A-Z
    desc = 'desc'  // Z-A
}

function OffersTable() {
    const [offers, setOffers] = useState<Array<Offer>>(data);
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<SortDirection>(SortDirection.asc);

    function handleSort(value: string) {
        const direction = value as SortDirection;
        setSort(direction);

        let result = [...data];
        if (direction === SortDirection.desc) {
            result.sort((a, b) =>
                a.location > b.location ? -1 :
                    a.location < b.location ? 1 :
                        0
            );
        }
        else { // default sort = A-Z
            result.sort((a, b) =>
                a.location < b.location ? -1 :
                    a.location > b.location ? 1 :
                        0
            );
        }

        setOffers(result);
    }

    function handleSearch(value: string) {
        setSearch(value);

        const term = value.toLowerCase();
        let result = [...data];

        if (term.length > 0) {
            result = [...data].filter(offer =>
                offer.location.toLowerCase().includes(term)
            )
        }

        setOffers(result);
    }

    return (
        <>
            <div className="d-flex px-4 w-50 my-5 bg-light">
                <input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="form-control me-4"
                />

                <select
                    className="form-select"
                    value={sort}
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value={SortDirection.asc}>Location A-Z</option>
                    <option value={SortDirection.desc}>Location Z-A</option>
                </select>
            </div>

            {
                offers.length === 0 &&
                <div className="text-danger m-5">
                    Error: no offers are available.
                </div>
            }
            {
                offers.length > 0 &&
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="w-25">Date</th>
                            <th className="w-25">Location</th>
                            <th className="w-50">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers.map((offer: Offer) =>
                                <tr key={offer.id}>
                                    <td>{offer.date}</td>
                                    <td>{offer.location}</td>
                                    <td>{formatPrice(offer.price)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </>
    );
}

export default OffersTable;