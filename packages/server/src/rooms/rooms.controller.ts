import {
  addRoomMember,
  getRoomById,
  getRooms,
  insertRoom,
  removeRoomMember,
} from './rooms.repository';
import { Context } from '../db/connection';
import {
  CreateRoomInput,
  RoomDetails,
  RoomMember,
  RoomDetailsWithMemberCount,
  RoomId,
} from '@ws-chat/common/src';

export const getAllRooms = async (ctx: Context): Promise<RoomDetailsWithMemberCount[]> =>
  await getRooms(ctx);

export const getRoom = async (ctx: Context, roomId: string): Promise<RoomDetails | null> =>
  await getRoomById(ctx, roomId);

export const createRoom = async (ctx: Context, room: CreateRoomInput): Promise<RoomId | null> =>
  await insertRoom(ctx, room);

export const addMember = async (ctx: Context, details: RoomMember): Promise<boolean> =>
  await addRoomMember(ctx, details);

export const removeMember = async (ctx: Context, details: RoomMember): Promise<boolean> =>
  await removeRoomMember(ctx, details);
