import { Context } from '../db/connection';
import { v4 as uuid } from 'uuid';
import {
  CreateRoomInput,
  RoomDetails,
  RoomDetailsWithMemberCount,
  RoomId,
  RoomMember,
} from '@ws-chat/common/src';

export const insertRoom = async (
  { db }: Context,
  room: CreateRoomInput,
): Promise<RoomId | null> => {
  try {
    const roomId = uuid();
    const sql = `
        with room_insert as (
          INSERT INTO rooms (id, name, owner) 
          VALUES($1, $2, $3) 
          RETURNING id as "room_id"
        ),
        room_member_insert AS (
          INSERT INTO room_members (room_id, user_id)
          SELECT room_id, $3
          FROM room_insert
          RETURNING *
        ) 
        SELECT room_id as id FROM room_insert;
        `;

    const values = [roomId, room.name, room.owner];

    const {
      rows: [identifier],
    } = await db.query<RoomId>(sql, values);

    return identifier;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRooms = async ({ db }: Context): Promise<RoomDetailsWithMemberCount[]> => {
  try {
    const sql = `
      SELECT r.id, r.name, r.owner, count(rm.user_id) as "memberCount" FROM rooms r
      LEFT JOIN room_members rm on r.id = rm.room_id
      GROUP BY r.id
    `;

    const { rows, rowCount } = await db.query<RoomDetailsWithMemberCount>(sql);

    return !rowCount ? [] : rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRoomById = async ({ db }: Context, roomId: string): Promise<RoomDetails | null> => {
  try {
    const sql = `
      SELECT id, name, owner FROM rooms
      WHERE id = $1
    `;
    const values = [roomId];

    const { rows } = await db.query<RoomDetails>(sql, values);

    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addRoomMember = async (
  { db }: Context,
  { roomId, userId }: RoomMember,
): Promise<boolean> => {
  try {
    const sql = `
        INSERT INTO room_members (room_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (room_id, user_id)
        DO UPDATE SET
          room_id = EXCLUDED.room_id,
          user_id = EXCLUDED.user_id
        RETURNING *;
      `;

    const values = [roomId, userId];

    const { rowCount } = await db.query(sql, values);

    return rowCount === 1 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeRoomMember = async (
  { db }: Context,
  { roomId, userId }: RoomMember,
): Promise<boolean> => {
  try {
    const sql = `
        DELETE FROM room_members
        WHERE room_id = $1 AND user_id = $2
        RETURNING *;
      `;

    const values = [roomId, userId];

    const { rowCount } = await db.query(sql, values);

    return rowCount === 1 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
