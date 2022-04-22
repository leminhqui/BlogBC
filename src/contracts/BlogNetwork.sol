pragma solidity ^0.5.0;


contract BlogNetwork {
  string public name;
  address public owner;
  uint public postCount = 0;
  uint public accountCount = 0;
  mapping(uint => Post) public posts;
  mapping(uint => Account) public account;


  struct Post {
    uint id;
    string hash;
    string title;
    string content;
    uint tipAmount;
    address payable author;
    uint createtime;
  }


  event PostCreated(
    uint id,
    string hash,
    string title,
    string content,
    uint tipAmount,
    address payable author,
    uint createtime
  );

  event PostTipped(
    uint id,
    string hash,
    string title,
    string content,
    uint tipAmount,
    address payable author
  );

  event PostUpdated(
    uint id,
    string hash,
    string title,
    string content,
    uint tipAmount,
    address payable author
  );

  event  PostDelete(
    uint id
  );

  constructor() public {
      owner = msg.sender;
      name = "Blockchain Blog";
  }
   function getOwner() public view returns (address)
    {
        return owner;
    }
  function createPost(string memory _imgHash, string memory _title, string memory _content) public {
      // Require valid content
        require(bytes(_content).length > 0);
      // make sure img hash exists
        require(bytes(_imgHash).length > 0);
      //make sure uploader address exists
        require(msg.sender != address(0x0));
      // Increment the post count
        postCount ++;
      // Create the post
        posts[postCount] = Post(postCount,_imgHash,_title, _content, 0, msg.sender,block.timestamp);
      // Trigger event
        emit PostCreated(postCount,_imgHash,_title, _content, 0, msg.sender,block.timestamp);
    }

  function tipPost(uint _id) public payable {
  // Make sure the id is valid  
    require(_id > 0 && _id <= postCount);
    // Fetch the post
    Post memory _post = posts[_id];
    // Fetch the author
    address payable _author = _post.author;
    // Fetch img
    string memory _imgHash = _post.hash;
    // / Fetch img
    string memory _title = _post.title;
    // / Fetch img
    string memory _content = _post.content;
    // Pay the author by sending them Ether
    _author.transfer(msg.value);
    // Increment the tip amount
    _post.tipAmount = _post.tipAmount + msg.value;
    // Update the post
    posts[_id] = _post;
    // Trigger an event
    emit PostTipped(_id,_imgHash,_title, _content,  _post.tipAmount, _author);
  }

   function updatePost(uint _id,string memory _imgHash, string memory _title, string memory _content) public payable {
    // Make sure the id is valid  
    require(_id > 0 && _id <= postCount);
    // Fetch the post
    Post memory _post = posts[_id];
    // Fetch the author
    address payable _author = _post.author;
    // Make sure address is author or admin
    require(msg.sender == _author);
    // Fetch img
   _post.hash = _imgHash;
    // / Fetch img
    _post.title = _title;
    // / Fetch img
    _post.content = _content;
    // Pay the author by sending them Ether
    _author.transfer(msg.value);
    // Increment the tip amount
    _post.tipAmount = _post.tipAmount + msg.value;
    // Update the post
    posts[_id] = _post;
    // Trigger an event
    emit PostUpdated(_id,_imgHash,_title, _content,  _post.tipAmount, _author);
  }

  function deletePost(uint _id) public payable {
    // Make sure the id is valid  
    require(_id > 0 && _id <= postCount);
    // Fetch the post
    Post memory _post = posts[_id];
    // Fetch the author
    address payable _author = _post.author;
    // Make sure address is author or admin
    require(msg.sender == owner || msg.sender == _author);
    // delete post
    delete posts[_id];
    emit PostDelete(_id);
  }


  struct Account {
    uint id;
    string hash;
    string name;
    string email;
    address payable author;
    uint createtime;
  }


  event AccountCreated(
    uint id,
    string hash,
    string name,
    string email,
    address payable author,
    uint createtime
  );

  event AccountUpdated(
    uint id,
    string hash,
    string name,
    string email
  );

    function createAccount(string memory _imgHash, string memory _name, string memory _email) public {
      // Require valid content
        require(bytes(_name).length > 0);
      // make sure img hash exists
        require(bytes(_imgHash).length > 0);
      //make sure uploader address exists
        require(msg.sender != address(0x0));
      // Increment the post count
        accountCount ++;
      // Create the post
        account[accountCount] = Account(accountCount,_imgHash,_name, _email, msg.sender,block.timestamp);
      // Trigger event
        emit AccountCreated(accountCount,_imgHash,_name, _email,msg.sender,block.timestamp);
    }
    function updateAccount(uint _id,string memory _imgHash, string memory _name, string memory _email) public payable {
    // Make sure the id is valid  
    require(_id > 0 && _id <= accountCount);
    // Fetch the post
    Account memory _account = account[_id];
    _account.hash = _imgHash;
    _account.name = _name;
    _account.email = _email;
    account[_id] = _account;
    emit AccountUpdated(_id,_imgHash,_name, _email);
  }
}

  

