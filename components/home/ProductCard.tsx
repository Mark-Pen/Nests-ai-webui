import cn from 'classnames';

interface ProductCardProps {
  title: string;
  description: string;
  tags: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, tags }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-all">
      <h3 className="text-gray-900 font-medium text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex gap-2">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
