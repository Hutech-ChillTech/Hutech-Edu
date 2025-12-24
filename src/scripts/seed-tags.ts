import { PrismaClient, TagType } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed IT Tags cho website học lập trình CNTT
 */
async function seedITTags() {
  console.log('🌱 Seeding IT Tags...');

  const itTags = [
    // Programming Languages
    { name: 'JavaScript', slug: 'javascript', type: 'GENERAL', description: 'Ngôn ngữ lập trình web phổ biến nhất' },
    { name: 'Python', slug: 'python', type: 'GENERAL', description: 'Ngôn ngữ đa năng, mạnh về AI/ML' },
    { name: 'Java', slug: 'java', type: 'GENERAL', description: 'Ngôn ngữ OOP mạnh mẽ cho enterprise' },
    { name: 'C#', slug: 'csharp', type: 'GENERAL', description: 'Ngôn ngữ của Microsoft .NET' },
    { name: 'C++', slug: 'cpp', type: 'GENERAL', description: 'Ngôn ngữ hiệu năng cao' },
    { name: 'TypeScript', slug: 'typescript', type: 'GENERAL', description: 'JavaScript với type safety' },
    { name: 'Go', slug: 'go', type: 'GENERAL', description: 'Ngôn ngữ của Google, mạnh về concurrency' },
    { name: 'Rust', slug: 'rust', type: 'GENERAL', description: 'Ngôn ngữ an toàn và hiệu năng cao' },
    { name: 'PHP', slug: 'php', type: 'GENERAL', description: 'Ngôn ngữ server-side phổ biến' },
    { name: 'Ruby', slug: 'ruby', type: 'GENERAL', description: 'Ngôn ngữ thanh lịch và dễ đọc' },

    // Frontend Frameworks
    { name: 'React', slug: 'react', type: 'GENERAL', description: 'Thư viện UI của Facebook' },
    { name: 'Angular', slug: 'angular', type: 'GENERAL', description: 'Framework của Google' },
    { name: 'Vue.js', slug: 'vue', type: 'GENERAL', description: 'Progressive JavaScript framework' },
    { name: 'Next.js', slug: 'nextjs', type: 'GENERAL', description: 'React framework cho production' },
    { name: 'Svelte', slug: 'svelte', type: 'GENERAL', description: 'Compiler-based framework' },

    // Backend Frameworks
    { name: 'Node.js', slug: 'nodejs', type: 'GENERAL', description: 'JavaScript runtime cho backend' },
    { name: 'Express.js', slug: 'express', type: 'GENERAL', description: 'Web framework cho Node.js' },
    { name: 'NestJS', slug: 'nestjs', type: 'GENERAL', description: 'Progressive Node.js framework' },
    { name: 'Django', slug: 'django', type: 'GENERAL', description: 'Python web framework' },
    { name: 'Flask', slug: 'flask', type: 'GENERAL', description: 'Micro web framework cho Python' },
    { name: 'Spring Boot', slug: 'spring-boot', type: 'GENERAL', description: 'Java framework' },
    { name: 'Laravel', slug: 'laravel', type: 'GENERAL', description: 'PHP framework thanh lịch' },
    { name: 'Ruby on Rails', slug: 'rails', type: 'GENERAL', description: 'Ruby web framework' },

    // Databases
    { name: 'SQL', slug: 'sql', type: 'GENERAL', description: 'Ngôn ngữ truy vấn cơ sở dữ liệu' },
    { name: 'PostgreSQL', slug: 'postgresql', type: 'GENERAL', description: 'SQL database mạnh mẽ' },
    { name: 'MySQL', slug: 'mysql', type: 'GENERAL', description: 'SQL database phổ biến' },
    { name: 'MongoDB', slug: 'mongodb', type: 'GENERAL', description: 'NoSQL document database' },
    { name: 'Redis', slug: 'redis', type: 'GENERAL', description: 'In-memory data store' },
    { name: 'Firebase', slug: 'firebase', type: 'GENERAL', description: 'Backend-as-a-Service của Google' },

    // DevOps & Tools
    { name: 'Docker', slug: 'docker', type: 'GENERAL', description: 'Container platform' },
    { name: 'Kubernetes', slug: 'kubernetes', type: 'GENERAL', description: 'Container orchestration' },
    { name: 'Git', slug: 'git', type: 'GENERAL', description: 'Version control system' },
    { name: 'GitHub', slug: 'github', type: 'GENERAL', description: 'Git hosting platform' },
    { name: 'CI/CD', slug: 'ci-cd', type: 'GENERAL', description: 'Continuous Integration/Deployment' },
    { name: 'AWS', slug: 'aws', type: 'GENERAL', description: 'Amazon Web Services' },
    { name: 'Azure', slug: 'azure', type: 'GENERAL', description: 'Microsoft Cloud Platform' },
    { name: 'Google Cloud', slug: 'google-cloud', type: 'GENERAL', description: 'Google Cloud Platform' },

    // Web Technologies
    { name: 'HTML', slug: 'html', type: 'GENERAL', description: 'Markup language cho web' },
    { name: 'CSS', slug: 'css', type: 'GENERAL', description: 'Styling language cho web' },
    { name: 'Sass', slug: 'sass', type: 'GENERAL', description: 'CSS preprocessor' },
    { name: 'Tailwind CSS', slug: 'tailwind', type: 'GENERAL', description: 'Utility-first CSS framework' },
    { name: 'Bootstrap', slug: 'bootstrap', type: 'GENERAL', description: 'CSS framework phổ biến' },

    // API & Architecture
    { name: 'REST API', slug: 'rest', type: 'GENERAL', description: 'RESTful API design' },
    { name: 'GraphQL', slug: 'graphql', type: 'GENERAL', description: 'Query language cho API' },
    { name: 'Microservices', slug: 'microservices', type: 'GENERAL', description: 'Kiến trúc microservices' },
    { name: 'WebSocket', slug: 'websocket', type: 'GENERAL', description: 'Real-time communication' },

    // AI & Data Science
    { name: 'AI', slug: 'ai', type: 'GENERAL', description: 'Artificial Intelligence' },
    { name: 'Machine Learning', slug: 'machine-learning', type: 'GENERAL', description: 'Machine Learning' },
    { name: 'Deep Learning', slug: 'deep-learning', type: 'GENERAL', description: 'Deep Learning' },
    { name: 'Data Science', slug: 'data-science', type: 'GENERAL', description: 'Data Science' },
    { name: 'TensorFlow', slug: 'tensorflow', type: 'GENERAL', description: 'ML framework của Google' },
    { name: 'PyTorch', slug: 'pytorch', type: 'GENERAL', description: 'ML framework của Facebook' },

    // Mobile Development
    { name: 'React Native', slug: 'react-native', type: 'GENERAL', description: 'Mobile framework với React' },
    { name: 'Flutter', slug: 'flutter', type: 'GENERAL', description: 'Mobile framework của Google' },
    { name: 'iOS', slug: 'ios', type: 'GENERAL', description: 'iOS development' },
    { name: 'Android', slug: 'android', type: 'GENERAL', description: 'Android development' },

    // Other
    { name: 'Testing', slug: 'testing', type: 'GENERAL', description: 'Software testing' },
    { name: 'Security', slug: 'security', type: 'GENERAL', description: 'Cybersecurity' },
    { name: 'Blockchain', slug: 'blockchain', type: 'GENERAL', description: 'Blockchain technology' },
    { name: 'Web3', slug: 'web3', type: 'GENERAL', description: 'Decentralized web' },
  ];

  let created = 0;
  let skipped = 0;

  for (const tag of itTags) {
    try {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {
          name: tag.name,
          description: tag.description,
          type: tag.type as TagType,
        },
        create: {
            name: tag.name,
            slug: tag.slug,
            description: tag.description,
            type: tag.type as TagType
        },
      });
      created++;
      console.log(`  ✅ ${tag.name}`);
    } catch (error) {
      skipped++;
      console.log(`  ⏭️  ${tag.name} (error: ${error})`);
    }
  }

  console.log(`\n✅ Seeding Tags completed!`);
  console.log(`   Created/Updated: ${created} tags`);
  console.log(`   Skipped/Failed: ${skipped} tags`);
}

/**
 * Main function
 */
async function main() {
  try {
    await seedITTags();
  } catch (error) {
    console.error('❌ Error seeding tags:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
