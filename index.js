import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;





app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


class Blog {
  constructor(title, subtitle, body, author) {
    this.title = title,
      this.subtitle = subtitle,
      this.body = body,
      this.author = author;
  }
}


const blogObjects = [];

// trial blog
const adminPost = new Blog(
  'The Impact of Renewable Energy on Modern Society',
  'How Renewable Energy Sources are Transforming the Energy Landscape',
  `
  In recent years, renewable energy has become a significant topic of discussion in the global community. As concerns about climate change and environmental degradation grow, the shift toward sustainable energy sources is more critical than ever.

  Renewable energy sources, such as solar, wind, hydroelectric, and geothermal, offer a viable solution to the challenges posed by fossil fuels. These sources are not only abundant but also produce little to no greenhouse gas emissions during operation. As technology advances, the efficiency and accessibility of these energy sources continue to improve, making them increasingly attractive options for individuals and businesses alike.

  The Benefits of Renewable Energy
  Environmental Impact: By reducing reliance on fossil fuels, renewable energy helps decrease air pollution and combat climate change.

  Economic Opportunities: The renewable energy sector has the potential to create millions of jobs in manufacturing, installation, and maintenance.

  Energy Independence: Utilizing domestic renewable resources can reduce dependence on foreign energy sources, enhancing national security.

  Challenges and Considerations
  While the benefits of renewable energy are significant, challenges remain. Intermittency issues with sources like solar and wind energy require advancements in energy storage and grid management. Additionally, the initial investment costs for renewable energy systems can be high, though prices have been steadily decreasing.

  In conclusion, renewable energy represents a crucial step towards a sustainable future. By embracing these technologies, society can move toward cleaner, more efficient energy systems that not only benefit the environment but also foster economic growth. The transition is underway, and the future of energy looks promising.
  `,
  'Admin'
)

const userPost = new Blog(
  'The Rise of Artificial Intelligence in Everyday Life',
  'Exploring the Growing Influence of AI Across Various Industries',
  `
  Artificial intelligence (AI) has rapidly evolved from a futuristic concept to a reality that is now transforming numerous aspects of our daily lives. As AI technologies continue to advance, their impact is being felt across multiple industries, from healthcare to transportation, and even entertainment.

  AI systems, such as machine learning algorithms and natural language processing, are being used to solve complex problems more efficiently than ever before. These technologies enable computers to learn from vast amounts of data, allowing them to make predictions, automate processes, and improve decision-making in ways that were previously unimaginable.

  The Benefits of Artificial Intelligence
  Improved Efficiency: AI has the potential to automate routine tasks, reducing human error and freeing up time for more creative and strategic activities.

  Enhanced Decision-Making: By analyzing large datasets, AI can offer insights and predictions that help businesses and organizations make more informed decisions.

  Personalized Experiences: AI is at the heart of personalized recommendations, from online shopping to streaming services, improving customer satisfaction and engagement.

  Challenges and Considerations
  While AI offers exciting opportunities, there are concerns that need to be addressed. Ethical issues surrounding data privacy and the potential displacement of jobs due to automation are significant challenges. Additionally, ensuring AI systems are fair, transparent, and free from bias remains a key consideration as the technology becomes more integrated into society.

  In conclusion, artificial intelligence is set to revolutionize various industries by increasing efficiency, enabling smarter decision-making, and enhancing user experiences. However, it is essential to address the challenges and ethical implications that accompany these advancements to ensure AI serves the best interests of society. The future of AI is undeniably bright, and it is poised to become an even more integral part of our everyday lives.
  `,
  'BERNARD'
)



blogObjects.push(adminPost);
blogObjects.push(userPost);

app.get("/",(req, res)=>{

  res.render('index.ejs',{
    posts : blogObjects,
    title : 'My Blog'
  });
})


app.get('/create', (req, res)=>{

    const postId = req.query.postId;
    if (postId){

      res.render('createpost.ejs', {
        editing: true,
        post : blogObjects[Number(postId)],
        postId : postId,
        title : 'My Blog'
      })
    }else{

      res.render('createpost.ejs',{
        editing : false,
        post : null,
        title : 'My Blog'
      });
    } 

  
})


app.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  blogObjects.splice(id, 1);

  res.redirect('/');
})

app.get('/viewpost/:index',(req,res)=>{
  const postId = Number(req.params.index);
  res.render('postview.ejs',{
    post: blogObjects[postId],
    postId:postId,
    title : blogObjects[postId].title
  });
})


app.get('/edit/:postId',(req, res)=>{
  const id = req.params.postId;
  res.redirect(`/create?postId=${id}`);
})

app.post('/update/:postId',(req, res)=>{
  const postId = (req.params.postId);
  blogObjects[postId] = new Blog(req.body.title, req.body.subtitle, req.body.body, req.body.author);
  res.redirect('/');
})




app.post('/submit', (req, res)=>{
  
  blogObjects.push( new Blog(req.body.title, req.body.subtitle, req.body.body, req.body.author));
  res.redirect('/');
})





app.get('/contact',(req, res)=>{
  const title = "Contact Page"
  if(req.query.submitted){
    res.render('contact.ejs',{
      submitted:Boolean(req.query.submitted),
      title
    })
  }
  res.render("contact.ejs", {
    submitted: null,
    title
  });
})


app.get("/post-comment", (req, res)=>{
  res.redirect(`/contact?submitted=true`);
})


app.get('/about',(req, res)=>{
  res.render('about.ejs',{
    title:"About Page"
  });
})


app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
})

