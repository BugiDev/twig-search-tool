import React, {Component} from 'react';
import TableRow from './TableRow';

export default class Table extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th><abbr title="Position">#</abbr></th>
                            <th>Twig Path</th>
                            <th><abbr title="Is modified?">Is modified?</abbr></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.results.map((path, index)=> {
                                return (<TableRow number={index} path={path} key={path} />);
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
