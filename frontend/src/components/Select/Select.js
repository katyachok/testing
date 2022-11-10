export const Select = ({options, value='', onSelect}) => {
    return (
        <select value={value || ''} onChange={onSelect}>
            <option>select customer</option>
            {
                options.map(({customer}) => {
                    return (
                        <option key={customer.first_name} value={customer.id}>{customer.first_name} {customer.last_name} {customer.email}</option>
                    )
                })
            }
        </select>
    )
}
