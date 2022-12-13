import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface DisclosureComponentProps {
  title: string;
  contents: React.ReactNode;
}

const DisclosureComponent: React.FC<DisclosureComponentProps> = (props) => {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-75">
              <span>{props.title}</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-700`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className={`${props.contents && "p-2 text-sm"}`.trim()}
            >
              {props.contents}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default DisclosureComponent;
