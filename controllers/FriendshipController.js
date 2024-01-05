const FriendshipModel = require('../models/FriendshipModel');
const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');

class FriendshipController {
    // Thêm bạn bè
    async addFriend(req, res) {
        try {
            const { user1, user2 } = req.body;
            const friendship = new FriendshipModel({ user1, user2 });
            await friendship.save();
            res.status(201).send('Friend added successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


    async accceptFriend(req, res) {
        try {
            const friendshipId = req.params.friendshipId;
            const updatedFriendship = await FriendshipModel.findByIdAndUpdate(
                friendshipId,
                { accepted: true },
                { new: true } // Trả về bản ghi đã được cập nhật
            );

            if (!updatedFriendship) {
                return res.status(404).send('Friendship not found');
            }

            // Tạo cuộc trò chuyện nếu chưa tồn tại
            const chat = await ChatModel.findOne({
                members: { $all: [updatedFriendship.user1, updatedFriendship.user2] }
            });

            if (!chat) {
                const newChat = new ChatModel({
                    members: [updatedFriendship.user1, updatedFriendship.user2],
                    chatName: "",
                    chatAvatar: "",
                });

                await newChat.save();
                await updatedFriendship.save();
            }

            res.json('Friend accept successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    // Xem danh sách bạn bè
    async getFriends(req, res) {
        try {
            const userId = req.params.userId;
            const friendships = await FriendshipModel.find({
                $and: [
                    { $or: [{ user1: userId }, { user2: userId }] },
                    { accepted: true }
                ]
            });

            const friendList = await Promise.all(friendships.map(async (friendship) => {
                const friendUserId = friendship.user1 === userId ? friendship.user2 : friendship.user1;
                const friendInfo = await UserModel.findById(friendUserId);
                const chat = await ChatModel.findOne({
                    members: { $all: [friendship.user1, friendship.user2] }
                });

                return {
                    chatId: chat._id, // Đặt chatId là _id của mối quan hệ bạn bè
                    name: friendInfo.name,
                    avatar: friendInfo.avatar,
                    userId: friendUserId,
                };
            }));

            res.json(friendList);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    // Xem thông tin mối quan hệ bạn bè giữa hai người dùng
    async getFriendshipBetweenUsers(req, res) {
        try {
            const { user1Id, user2Id } = req.params;

            const friendship = await FriendshipModel.findOne({
                $or: [
                    { $and: [{ user1: user1Id }, { user2: user2Id }] },
                    { $and: [{ user1: user2Id }, { user2: user1Id }] }
                ]
            });

            if (!friendship) {
                return res.status(404).send('Friendship not found');
            }

            res.json(friendship);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


    // Hủy kết nối
    async removeFriend(req, res) {
        try {
            const friendshipId = req.params.friendshipId;
            await FriendshipModel.findByIdAndDelete(friendshipId);
            res.send('Friend removed successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new FriendshipController();

