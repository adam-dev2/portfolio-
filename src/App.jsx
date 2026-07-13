import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { LuBookOpen } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const photoClicked = (project) => {
    setSelectedProject(project);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />
      <div
        className="min-h-screen text-white font-sans px-6 pt-24 bg-grid-pattern"
      >
        <motion.div
          className="max-w-3xl mx-auto relative"
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-end gap-10">
            <a
              className="hover:scale-[1.05] transition-transform"
              href="https://x.com/dev_adam2"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter size={25} />
            </a>
            <a
              className="hover:scale-[1.05] transition-transform"
              href="https://github.com/adam-dev2"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub size={25} />
            </a>
          </div>

          <div className="relative mb-10">
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex mb-6 relative">
              <img
                src="./Media.jpg"
                alt="profile"
                className="rounded-3xl w-36 h-36 object-cover ring-1 ring-white/10"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-2xl font-semibold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Hey!!, I'm Adam
              </h1>
              <p className="text-sm text-gray-200">
                22, Backend Engineer <span className="inline-block w-2 h-4 bg-gray-200 animate-blink ml-0.5" />
              </p>
              <p className="text-gray-300/80 max-w-xl text-sm">
                I'm a Backend Engineer. I enjoy building simple, reliable web products and exploring how complex web apps work under the hood.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h1 className="text-green-400 font-semibold text-3xl">Experience</h1>
            <motion.div
              className="h-0.5 bg-green-400/60 rounded-full mt-1"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <p className="pt-3 font-light text-md opacity-80 max-w-2xl font-sans">
              A glimpse into my internship experiences where I applied and sharpened my full-stack skills.
            </p>

            <motion.div
              className="space-y-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-neutral-900 border border-green-500/10 rounded-3xl p-5 hover:scale-[1.02] hover:border-green-500/25 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <h2 className="text-lg font-semibold text-white">
                    {exp.role} @ {exp.company}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 italic">{exp.duration}</p>
                  <ul className="list-disc list-inside mt-3 text-gray-300 text-sm space-y-1 marker:text-green-400">
                    {exp.bullets.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-20">
            <h1 className="text-blue-500 font-semibold text-3xl">Projects</h1>
            <motion.div
              className="h-0.5 bg-blue-500/60 rounded-full mt-1"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <p className="pt-3 font-light text-md opacity-80 max-w-xl font-sans">
              These projects helped me refine my craft and showcase my skills in the right direction.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-neutral-900 border border-blue-500/10 rounded-3xl p-4 hover:shadow-md hover:shadow-blue-500/5 hover:scale-[1.02] transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                  <p className="text-sm text-gray-400 mt-2">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <FiGithub size={18} />
                    </a>
                    {project.live && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <FaArrowUpRightFromSquare size={17} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-20 pb-4">
            <h1 className="text-purple-400 font-semibold text-3xl">Blender Projects</h1>
            <motion.div
              className="h-0.5 bg-purple-400/60 rounded-full mt-1"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <p className="pt-3 font-light text-md opacity-80 max-w-3xl font-sans">
              Besides coding, I enjoy crafting cinematic 3D scenes in Blender. These are a few personal explorations where I focused on lighting, mood, and storytelling through environment design.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {blenderProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={`container-${project.id}`}
                  className="bg-neutral-900 border border-purple-500/10 rounded-3xl overflow-hidden cursor-pointer hover:border-purple-500/25 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  onClick={() => { photoClicked(project); }}
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
                href="mailto:adiem.rar@Proton.me"
                className="bg-neutral-900 border border-pink-500/10 rounded-3xl p-6 hover:border-pink-400 transition-all duration-300 text-center group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <div className="text-3xl mb-2 flex justify-center"><MdOutlineMail /></div>
                <h3 className="text-white font-semibold mb-1">Email Me</h3>
                <p className="text-gray-400 text-sm">adiem.rar@Proton.me</p>
              </a>

              <a
                href="https://x.com/dev_adam2"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-900 border border-pink-500/10 rounded-3xl p-6 hover:border-pink-400 transition-all duration-300 text-center group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <div className="text-3xl mb-2 flex justify-center"><FaXTwitter size={25} /></div>
                <h3 className="text-white font-semibold mb-1">DM on Twitter</h3>
                <p className="text-gray-400 text-sm">@dev_adam2</p>
              </a>
            </div>
          </div>

          <div className="pb-10 mt-14">
            <div className="border-b border-zinc-700/70" />
            <div className="flex justify-between pt-4">
              <p className="opacity-90 text-zinc-500">Adam</p>
              <div className="flex justify-end gap-10 mt-2">
                <a
                  className="hover:scale-[1.05] hover:text-white transition-all"
                  href="https://x.com/dev_adam2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaXTwitter className="opacity-60 hover:opacity-100 transition-opacity" size={16} />
                </a>
                <a
                  className="hover:scale-[1.05] hover:text-white transition-all"
                  href="https://medium.com/@shaikadam273"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LuBookOpen className="opacity-60 hover:opacity-100 transition-opacity" size={16} />
                </a>
                <a
                  className="hover:scale-[1.05] hover:text-white transition-all"
                  href="https://github.com/adam-dev2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiGithub className="opacity-60 hover:opacity-100 transition-opacity" size={16} />
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
                <PhotoViewer imgObj={selectedProject} setSelectedProject={setSelectedProject} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
