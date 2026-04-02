import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { LuBookOpen } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { motion,AnimatePresence } from "framer-motion";
import projects from "./projects";
import experiences from "./experience";
import blenderProjects from "./blenderProjects";
import { useState } from "react";
import PhotoViewer from "./components/PhotoViewer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.4,
    },
  },
};


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);


  const photoClicked = (project) => {
    setSelectedProject(project);
  };


  return <>
    
    <div
      className="min-h-screen text-white font-sans px-6 pt-24"
      style={{
        backgroundColor: "#0d0d0d",
        backgroundImage: `
          linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <motion.div
        className="max-w-3xl mx-auto relative overflow-hidden"
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-end gap-10">
          <a className="hover:scale-105" href="https://x.com/dev_adam2" target="_blank" rel="noreferrer">
            <FaXTwitter size={25} />
          </a>
          <a className="hover:scale-105" href="https://github.com/adam-dev2" target="_blank" rel="noreferrer">
            <FiGithub size={25} />
          </a>
        </div>

        <div className="flex mb-6">
          <img
            src="./Media.jpg"
            alt="profile"
            className="rounded-3xl w-36 h-36 object-cover"
          />
        </div>

        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-light">Hey!! , I'm Adam</h1>
          <p className="text-sm text-gray-200">22, Automation Engineer</p>
          <p className="text-gray-300/80 max-w-xl text-sm">
            I'm a Automation Engineer. I enjoy building simple, reliable web products and exploring how complex web apps work under the hood.
          </p>
        </div>

        <div className="mt-20">
          <h1 className="text-green-400 font-semibold text-3xl">Experience</h1>
          <p className="pt-3 font-light text-md opacity-80 max-w-2xl font-sans">
            A glimpse into my internship experiences where I applied and sharpened my full-stack skills.
          </p>
          <motion.div
            className="space-y-6 mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 hover:scale-102 transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {exp.role} @ {exp.company}
                </h2>
                <p className="text-sm text-gray-400 mt-1 italic">{exp.duration}</p>
                <ul className="list-disc list-inside mt-3 text-gray-300 text-sm space-y-1">
                  {exp.bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-10 pt-10">
          <h1 className="text-blue-500 font-semibold text-3xl">Projects</h1>
          <p className="pt-3 font-light text-md opacity-80 max-w-xl font-sans">
            These projects helped me refine my craft and showcase my skills in the right direction.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 hover:shadow-md transition hover:scale-102"
              >
                <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                <p className="text-sm text-gray-400 mt-2">{project.description}</p>
                <div className="flex gap-4 mt-6">
                  <a href={project.github} target="_blank" rel="noreferrer" className="opacity-80">
                    <FiGithub size={18} />
                  </a>
                  {project.live && <a href={project.demo} target="_blank" rel="noreferrer" className="opacity-70">
                    <FaArrowUpRightFromSquare size={17} />
                  </a>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-20 pb-4">
          <h1 className="text-purple-400 font-semibold text-3xl">Blender Projects</h1>
          <p className="pt-3 font-light text-md opacity-80 max-w-3xl font-sans">
            Besides coding, I enjoy crafting cinematic 3D scenes in Blender. These are a few personal explorations where I focused on lighting, mood, and storytelling through environment design.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blenderProjects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`container-${project.id}`}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => {photoClicked(project)}}
              >
                <img
                  src={project.image}
                  className="object-cover w-full h-56"
                  alt={project.title}
                />
                <div className="p-4">
                  <h3 className="text-white font-semibold">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-20 mb-10">
          <h1 className="text-pink-400 font-semibold text-3xl mb-4">Get In Touch</h1>
          <p className="font-light text-md opacity-80 max-w-xl mb-6">
            Open to collaborations or just a friendly chat about tech or 3D art.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="mailto:shaikadam273@gmail.com"
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 hover:border-green-400 transition text-center group"
            >
              <div className="text-3xl mb-2 flex justify-center"><MdOutlineMail /></div>
              <h3 className="text-white font-semibold mb-1">Email Me</h3>
              <p className="text-gray-400 text-sm">shaikadam273@gmail.com</p>
            </a>
            
            <a 
              href="https://x.com/dev_adam2"
              target="_blank"
              rel="noreferrer"
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 hover:border-blue-400 transition text-center group"
            >
              <div className="text-3xl mb-2 flex justify-center"><FaXTwitter size={25} /></div>
              <h3 className="text-white font-semibold mb-1">DM on Twitter</h3>
              <p className="text-gray-400 text-sm">@dev_adam2</p>
            </a>
          </div>
        </div>
        <div className="pb-10 mt-14">
            <div className="border-b-1 border-zinc-700 opacity-70"></div>
            <div className="flex justify-between pt-4">
              <p className="opacity-90 text-zinc-500">Adam</p>

              <div className="flex justify-end gap-10 mt-2">
                <a className="hover:scale-105" href="https://x.com/dev_adam2" target="_blank" rel="noreferrer">
                  <FaXTwitter className="opacity-60" size={16} />
                </a>
                <a className="hover:scale-105" href="https://medium.com/@shaikadam273" target="_blank" rel="noreferrer">
                  <LuBookOpen className="opacity-60" size={16} />
                </a>
                <a className="hover:scale-105" href="https://github.com/adam-dev2" target="_blank" rel="noreferrer">
                  <FiGithub className="opacity-60" size={16} />
                </a>
              </div>
            </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div onClick={(e) => e.stopPropagation()}>
              <PhotoViewer imgObj={selectedProject} setSelectedProject={setSelectedProject}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      
  </>
};

export default App;