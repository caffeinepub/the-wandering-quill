import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

actor {
  // Types
  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    author : Text;
    date : Int;
    imageUrl : Text;
    tags : [Text];
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  type NewsletterSubscriber = {
    id : Nat;
    email : Text;
    subscribedAt : Int;
  };

  // Comparison modules for sorting
  module BlogPost {
    public func compareByDateDesc(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      if (post1.date > post2.date) { #less } else if (post1.date < post2.date) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  // BlogPost Storage
  var nextPostId = 1;
  let blogPosts = Map.empty<Nat, BlogPost>();

  // ContactMessage Storage
  var nextMessageId = 1;
  let contactMessages = List.empty<ContactMessage>();

  // NewsletterSubscriber Storage
  var nextSubscriberId = 1;
  let subscribers = List.empty<NewsletterSubscriber>();

  // Seed blog posts with sample data
  func seedBlogPosts() : () {
    let samplePosts : [BlogPost] = [
      {
        id = 1;
        title = "Exploring the Swiss Alps";
        excerpt = "A journey through the breathtaking landscapes of Switzerland.";
        content = "Full content about Swiss Alps travel experience...";
        category = "Travel";
        author = "Jane Doe";
        date = 1685664000; // Unix timestamp
        imageUrl = "https://example.com/swiss-alps.jpg";
        tags = ["mountains", "adventure"];
      },
      {
        id = 2;
        title = "Blockchain Technology 101";
        excerpt = "Understanding the basics of blockchain technology.";
        content = "Full content about blockchain technology...";
        category = "Technology";
        author = "John Smith";
        date = 1685750400;
        imageUrl = "https://example.com/blockchain.jpg";
        tags = ["blockchain", "crypto"];
      },
      {
        id = 3;
        title = "Minimalist Lifestyle Tips";
        excerpt = "How to embrace a minimalist lifestyle for a happier life.";
        content = "Full content about minimalist living...";
        category = "Lifestyle";
        author = "Jane Doe";
        date = 1685836800;
        imageUrl = "https://example.com/minimalist.jpg";
        tags = ["minimalism", "lifestyle"];
      },
      {
        id = 4;
        title = "Healthy Mediterranean Recipes";
        excerpt = "Delicious and nutritious Mediterranean dishes.";
        content = "Full content about recipes...";
        category = "Food";
        author = "John Smith";
        date = 1685923200;
        imageUrl = "https://example.com/mediterranean.jpg";
        tags = ["recipes", "healthy"];
      },
      {
        id = 5;
        title = "Yoga for Beginners";
        excerpt = "Starting your yoga journey with basic poses.";
        content = "Full content about yoga...";
        category = "Health";
        author = "Jane Doe";
        date = 1686009600;
        imageUrl = "https://example.com/yoga.jpg";
        tags = ["yoga", "fitness"];
      },
      {
        id = 6;
        title = "Landscape Photography Techniques";
        excerpt = "Capturing the beauty of nature with your camera.";
        content = "Full content about photography...";
        category = "Photography";
        author = "John Smith";
        date = 1686096000;
        imageUrl = "https://example.com/landscape.jpg";
        tags = ["photography", "nature"];
      },
    ];

    for (post in samplePosts.values()) {
      blogPosts.add(post.id, post);
    };
    nextPostId := samplePosts.size() + 1;
  };

  // Initialize blog posts on actor creation
  system func preupgrade() { /* Nothing to do */ };

  system func postupgrade() {
    seedBlogPosts();
  };

  // BlogPost functions
  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort(BlogPost.compareByDateDesc);
  };

  public query ({ caller }) func getBlogPostById(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("BlogPost with id " # id.toText() # " does not exist") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getBlogPostsByCategory(category : Text) : async [BlogPost] {
    let filtered = blogPosts.values().filter(
      func(post) {
        post.category.equal(category);
      }
    );
    filtered.toArray().sort(BlogPost.compareByDateDesc);
  };

  // ContactMessage functions
  public shared ({ caller }) func submitContact(name : Text, email : Text, subject : Text, message : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    let newMessage : ContactMessage = {
      id = nextMessageId;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(newMessage);
    nextMessageId += 1;
    #ok("Contact message submitted successfully");
  };

  // NewsletterSubscriber functions
  public shared ({ caller }) func subscribeNewsletter(email : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    let exists = subscribers.any(
      func(sub) {
        sub.email.equal(email);
      }
    );

    if (exists) {
      return #err("Email already subscribed");
    };

    let newSubscriber : NewsletterSubscriber = {
      id = nextSubscriberId;
      email;
      subscribedAt = Time.now();
    };
    subscribers.add(newSubscriber);
    nextSubscriberId += 1;
    #ok("Subscribed successfully");
  };
};
