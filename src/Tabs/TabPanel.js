/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import invariant from 'invariant'

class TabPanel extends Component {

  componentWillMount() {
    this.prepareIsActive(this.props)
  }

  shouldComponentUpdate(nextProps) {
    this.prevActive = this.active
    this.prepareIsActive(nextProps)
    return this.active || this.prevActive !== this.active
  }

  prepareIsActive(props) {
    const { tabs } = this.context
    if ('activeKey' in props) {
      this.active = props.activeKey === tabs.props.activeKey
    } else {
      const index = tabs.panelCount++
      this.active = index === tabs.state.activeIndex
    }
  }

  render() {
    const { children, className, activeKey, ...other } = this.props
    const { tabs } = this.context

    'activeKey' in tabs.props && invariant(
      'activeKey' in this.props,
      'You set `activeKey` for `Tabs` but no `activeKey` for `TabPanel`'
    )

    // Should not render and unmount when not acitve
    if (this.active) {
      this.children = children
    }

    return (
      <div className={classNames('bfd-tabs__panel', {
        'bfd-tabs__panel--active': this.active
      }, className)} {...other}>
        {this.active ? children : this.children}
      </div>
    )
  }
}

TabPanel.contextTypes = {
  tabs: PropTypes.object
}

TabPanel.propTypes = {
  // 与 Tabs activeKey 对应
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default TabPanel
