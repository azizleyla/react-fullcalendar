import React from "react"

export const withDataFetching = (WrappedComponent, dataSource) => {
    class withDataFetching extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                isLoading: false,
                error: null
            }

        }
        componentDidMount() {
            this.setState({ isLoading: true });
            fetch(dataSource)
                .then(response => response.json())
                .then(data => this.setState({ data, isLoading: false }))
                .catch(error => this.setState({ error, isLoading: false }));

        }
        render() {
            const { data, isLoading, error } = this.state;
            return (
                <WrappedComponent {...this.props} data={data} isLoading={isLoading} error={error} />
            )
        }
    }
    return withDataFetching
}