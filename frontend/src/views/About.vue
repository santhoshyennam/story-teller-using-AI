<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About Storyteller</h1>
        <v-divider></v-divider>
        <v-card class="mt-5">
          <v-card-title>What is Storyteller?</v-card-title>
          <v-card-text>
            Storyteller is a pioneering digital platform dedicated to revolutionizing the way stories are crafted, managed, and enjoyed. We offer a comprehensive suite of features that enhance your storytelling experience, enabling you to:
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Generate Stories:</v-list-item-title>
                  <v-list-item-subtitle>Leverage state-of-the-art artificial intelligence to create captivating and original stories within seconds.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Save Stories:</v-list-item-title>
                  <v-list-item-subtitle>Securely store your stories and retrieve them at any time.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Edit Stories:</v-list-item-title>
                  <v-list-item-subtitle>Refine and update your stories effortlessly with our intuitive editing tools.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Read Later:</v-list-item-title>
                  <v-list-item-subtitle>Read your favorite stories to enjoy later at your convenience.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Translate Stories:</v-list-item-title>
                  <v-list-item-subtitle>Instantly translate stories into various languages, making your tales globally accessible.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>Our Team</v-card-title>
          <v-card-text>
            We are a group of five enthusiastic students, united by our shared passion for storytelling and technology. Each of us brings unique skills and perspectives to the table, collectively driving our project forward. Our goal is to continuously innovate and improve the Storyteller platform as part of our college project, blending our academic learning with practical application to create something truly unique.
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>Our Journey</v-card-title>
          <v-card-text>
            Storyteller originated from our vision to make storytelling accessible and enjoyable for all. As part of our college project, we embarked on this journey with the goal of democratizing the art of storytelling. Here’s a brief overview of how we've been turning our vision into reality:
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>GitHub Collaboration:</v-list-item-title>
                  <v-list-item-text>Our project began with the setup of a GitHub repository, which enabled us to collaborate efficiently and manage our code with effective version control, essential for coordinating our work as a student team.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Learning Phase:</v-list-item-title>
                  <v-list-item-text>We committed ourselves to learning Vue.js components and AWS EC2 to ensure strong development practices and seamless deployment. This part of our project not only enhanced our technical skills but also prepared us for real-world software development challenges.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Initial Website Launch:</v-list-item-title>
                  <v-list-item-text>We created the first version of our website and set up a database to efficiently manage and store story content. This foundational work was crucial for our project, allowing us to build and iterate on our initial ideas effectively.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>User Authentication:</v-list-item-title>
                  <v-list-item-text>To ensure a secure and personalized user experience, we implemented robust user authentication mechanisms. This was a key step in our project, as it allowed us to protect user data and provide customized content, enhancing the overall functionality of our platform.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Automated Deployment:</v-list-item-title>
                  <v-list-item-text>We utilized GitHub Actions for automated deployment, which streamlined the process of updating our website whenever changes were made and merged into the main branch. This automation significantly improved our efficiency and helped maintain a consistent development workflow for our project.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Story Generation with OpenAI:</v-list-item-title>
                  <v-list-item-text>We integrated an API call to OpenAI to leverage their advanced algorithms for automated, high-quality story generation. This integration was crucial for enabling our platform to produce compelling and creative stories effortlessly.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>API Testing with Postman:</v-list-item-title>
                  <v-list-item-text>We conducted thorough testing of our API functionalities using Postman to ensure both reliability and optimal performance. This step was essential in our project to verify that all system components interact seamlessly and function as intended.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Editing and Translation Tools:</v-list-item-title>
                  <v-list-item-text>We introduced versatile editing and translation features to give users more creative control over their stories. This enhancement was a key part of our project, aiming to empower users to easily modify and translate their narratives according to their needs.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Admin Tools:</v-list-item-title>
                  <v-list-item-text>We developed advanced administrative tools to effectively manage story inputs and user interactions. This development was an integral part of our project, ensuring that we could oversee and streamline the process for a better user experience.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>User Profile Management:</v-list-item-title>
                  <v-list-item-text>We crafted personalized user profiles to enhance user engagement and experience.</v-list-item-text>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.v-card {
  margin-top: 20px;
}
</style>
