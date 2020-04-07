import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Creators } from '../../store/ducks/enemies'
import { SPRITE_SIZE, SCREEN_SIZE } from '../../utils/constants'
import { enemies as enemiesAssets } from '../../assets'

import MapRow from './MapRow'

import Character from '../Character'
import Enemie from '../Enemie'

export default function Map() {
  const dispatch = useDispatch()
  const enemiesLength = useSelector(state => state.enemies.length)
  const { mapId } = useSelector(state => state.map)

  const { tiles, enemies } = require(`../../maps/${mapId}`)

  useEffect(() => {
    console.log('map id mudou')
    console.log('lista de inimigos', enemiesLength)
    dispatch(Creators.setEnemies(enemies))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapId])

  return (
    <div
      style={{
        position: 'relative',
        margin: '50px auto',
        width: `${SPRITE_SIZE * SCREEN_SIZE.WIDTH}px`,
        height: `${SPRITE_SIZE * SCREEN_SIZE.HEIGHT}px`,
        border: '4px solid white',
        backgroundColor: '#93B919',
      }}
    >
      {tiles.map((row, i) => <MapRow key={i} row={row}/>)}
      <Character />

      {enemiesLength > 0 && enemies.map((enemie, id) => (
        <Enemie
          key={id}
          id={id}
          maxStep={enemie.maxStep}
          sprite={enemiesAssets[enemie.name]}
          vertical={enemie.vertical}
          offset={enemie.offset}
          animationTime={enemie.animationTime}
        />
      ))}

      {/* <Enemie
        initialPosition={{ top: SPRITE_SIZE * 5, left: SPRITE_SIZE * 7 }}
        maxStep={3}
        sprite={enemiesAssets.lpcwanddemo}
        vertical
      /> */}

      {/* <Enemie
        initialPosition={{ top: SPRITE_SIZE * 7, left: SPRITE_SIZE * 9 }}
        maxStep={4}
        sprite={enemiesAssets.bat}
      /> */}
    </div>
  )
}
