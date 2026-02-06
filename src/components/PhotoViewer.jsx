import { motion } from "framer-motion";

const PhotoViewer = ({ imgObj }) => {
    console.log(`container-${imgObj.id}`);
    
  return (
    <motion.div 
      layoutId={`container-${imgObj.id}`}
      className="max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden"
    >
      <img
        src={imgObj.image}
        className="object-cover w-full"
        alt={imgObj.title}
      />
      <div className="p-4">
        <h3 className="text-white text-xl font-semibold">{imgObj.title}</h3>
        <p className="text-gray-400">{imgObj.description}</p>
      </div>
    </motion.div>
  );
};

export default PhotoViewer;