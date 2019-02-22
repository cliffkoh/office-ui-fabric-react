// @codepen

import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const _getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const _columns = [
  {
    fieldName: 'id',
    key: 'id',
    name: 'id'
  }
];

const _items = new Array(5).fill(undefined).map(() => ({ id: _getRandomInt(100) }));

export class DetailsListBasicExample extends React.Component {
  state = {
    isDragDropEnabled: true
  };

  getDragDropEvents = () => {
    const { isDragDropEnabled } = this.state;

    if (!isDragDropEnabled) return null;

    return {
      canDrop: () => true,
      canDrag: () => true,
      onDragEnter: item => {},
      onDrop: (item, e) => {
        // this.handleDrop(item, e);
        console.log('dropping');
      }
    };
  };

  render() {
    const { isDragDropEnabled } = this.state;

    return (
      <div>
        <div>
          <ul>
            <li style={{ background: 'lightgreen' }}>Drag/Drop starts out as enabled (try dragging rows).</li>
            <li style={{ background: 'pink' }}>
              Disabling drag/Drop (with the button) changes the <code>dragDropEvents</code> props to <code>null</code>, but the rows are
              still draggable.
            </li>
          </ul>
        </div>

        <div>
          <button onClick={() => this.setState({ isDragDropEnabled: !isDragDropEnabled })}>
            {isDragDropEnabled ? 'Disable' : 'Enable'} Drag/Drop
          </button>

          <div>Drag/Drop should be {isDragDropEnabled ? 'disabled' : 'enabled'}.</div>
        </div>

        <DetailsList columns={_columns} items={_items} dragDropEvents={this.getDragDropEvents()} />
      </div>
    );
  }
}
