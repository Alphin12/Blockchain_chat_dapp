//SPX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    //User Strct

    struct user {
        string name;
        friend[] friendList;
    }
    struct friend {
        address pubkey;
        string name;
    }
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUser {
        string name;
        address accountAddress;
    }

    AllUser[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //CHECK USER EXIST

    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // CREAT ACCOUNT

    function createAccount(string calldata name) external {
        require(checkUserExist(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
        getAllUsers.push(AllUser(name, msg.sender));
    }

    //GET USERNAME

    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExist(pubkey), "User is not registerd");
        return userList[pubkey].name;
    }

    //ADD FRIEND

    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExist(msg.sender), "create an account first");
        require(checkUserExist(friend_key), "User is not registerd");
        require(
            msg.sender != friend_key,
            "User cannot add themeselves as a friend"
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "these users are already friends"
        );
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) {
                return true;
            }
        }
        return false;
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //GET MY FRIEND

    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    // get chat code

    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //send message

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExist(msg.sender), "create an account first");
        require(checkUserExist(friend_key), "User is not registerd");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "you are not friend with"
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    // READ MESSAGES

    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns (AllUser[] memory) {
        return getAllUsers;
    }
}
